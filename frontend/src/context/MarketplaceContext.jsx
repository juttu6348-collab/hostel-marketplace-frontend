import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

const MarketplaceContext = createContext(null);

const FAVOURITES_STORAGE_KEY = "hostelhub_favourites";
const BOOKINGS_STORAGE_KEY = "hostelhub_booking_requests";
const OWNER_LISTINGS_STORAGE_KEY = "hostelhub_owner_listings";

function readStorage(key, fallbackValue) {
  try {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
      return fallbackValue;
    }

    return JSON.parse(storedValue);
  } catch (error) {
    console.error(`Unable to read ${key}:`, error);
    return fallbackValue;
  }
}

export function MarketplaceProvider({ children }) {
  const { user } = useAuth();

  const [favouriteHostelIds, setFavouriteHostelIds] = useState(
    () => readStorage(FAVOURITES_STORAGE_KEY, []),
  );

  const [bookingRequests, setBookingRequests] = useState(
    () => readStorage(BOOKINGS_STORAGE_KEY, []),
  );

  const [ownerListings, setOwnerListings] = useState(
    () => readStorage(OWNER_LISTINGS_STORAGE_KEY, []),
  );

  useEffect(() => {
    localStorage.setItem(
      FAVOURITES_STORAGE_KEY,
      JSON.stringify(favouriteHostelIds),
    );
  }, [favouriteHostelIds]);

  useEffect(() => {
    localStorage.setItem(
      BOOKINGS_STORAGE_KEY,
      JSON.stringify(bookingRequests),
    );
  }, [bookingRequests]);

  useEffect(() => {
    localStorage.setItem(
      OWNER_LISTINGS_STORAGE_KEY,
      JSON.stringify(ownerListings),
    );
  }, [ownerListings]);

  function isFavourite(hostelId) {
    return favouriteHostelIds.includes(Number(hostelId));
  }

  function toggleFavourite(hostelId) {
    const normalizedHostelId = Number(hostelId);

    setFavouriteHostelIds((currentIds) => {
      if (currentIds.includes(normalizedHostelId)) {
        return currentIds.filter(
          (currentId) => currentId !== normalizedHostelId,
        );
      }

      return [...currentIds, normalizedHostelId];
    });
  }

  function createBookingRequest(bookingData) {
    if (!user) {
      throw new Error(
        "A user must be logged in to create a booking request.",
      );
    }

    const newRequest = {
      id: `booking-${Date.now()}`,
      userId: user.id,
      userEmail: user.email,
      userName: user.fullName,
      status: "pending",
      createdAt: new Date().toISOString(),
      ...bookingData,
    };

    setBookingRequests((currentRequests) => [
      newRequest,
      ...currentRequests,
    ]);

    return newRequest;
  }

  function cancelBookingRequest(bookingId) {
    setBookingRequests((currentRequests) =>
      currentRequests.map((booking) =>
        booking.id === bookingId &&
        booking.status === "pending"
          ? {
              ...booking,
              status: "cancelled",
              cancelledAt: new Date().toISOString(),
            }
          : booking,
      ),
    );
  }

  function updateBookingStatus(bookingId, status) {
    const allowedStatuses = [
      "pending",
      "approved",
      "rejected",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return;
    }

    setBookingRequests((currentRequests) =>
      currentRequests.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              status,
              updatedAt: new Date().toISOString(),
            }
          : booking,
      ),
    );
  }

  function createOwnerListing(listingData) {
    if (!user || user.role !== "owner") {
      throw new Error(
        "Only hostel owners can create listings.",
      );
    }

    const newListing = {
      id: `listing-${Date.now()}`,
      ownerId: user.id,
      ownerEmail: user.email,
      status: "draft",
      approvalStatus: "not-submitted",
      isSuspended: false,
      reportCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rooms: [],
      ...listingData,
    };

    setOwnerListings((currentListings) => [
      newListing,
      ...currentListings,
    ]);

    return newListing;
  }

  function updateOwnerListing(listingId, updates) {
    setOwnerListings((currentListings) =>
      currentListings.map((listing) =>
        listing.id === listingId
          ? {
              ...listing,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : listing,
      ),
    );
  }

  function deleteOwnerListing(listingId) {
    setOwnerListings((currentListings) =>
      currentListings.filter(
        (listing) => listing.id !== listingId,
      ),
    );
  }

function toggleListingPublication(listingId) {
  setOwnerListings((currentListings) =>
    currentListings.map((listing) => {
      if (listing.id !== listingId) {
        return listing;
      }

      if (
        listing.status !== "published" &&
        listing.approvalStatus !== "approved"
      ) {
        return listing;
      }

      if (listing.isSuspended) {
        return listing;
      }

      return {
        ...listing,
        status:
          listing.status === "published"
            ? "draft"
            : "published",
        updatedAt: new Date().toISOString(),
      };
    }),
  );
}

  function submitListingForApproval(listingId) {
  setOwnerListings((currentListings) =>
    currentListings.map((listing) =>
      listing.id === listingId
        ? {
            ...listing,
            approvalStatus: "pending",
            status: "draft",
            submittedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        : listing,
    ),
  );
}

function approveOwnerListing(listingId) {
  setOwnerListings((currentListings) =>
    currentListings.map((listing) =>
      listing.id === listingId
        ? {
            ...listing,
            approvalStatus: "approved",
            isSuspended: false,
            reviewedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        : listing,
    ),
  );
}

function rejectOwnerListing(listingId, reason = "") {
  setOwnerListings((currentListings) =>
    currentListings.map((listing) =>
      listing.id === listingId
        ? {
            ...listing,
            approvalStatus: "rejected",
            status: "draft",
            rejectionReason: reason,
            reviewedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        : listing,
    ),
  );
}

function toggleListingSuspension(listingId) {
  setOwnerListings((currentListings) =>
    currentListings.map((listing) =>
      listing.id === listingId
        ? {
            ...listing,
            isSuspended: !listing.isSuspended,
            status: listing.isSuspended
              ? listing.status
              : "draft",
            updatedAt: new Date().toISOString(),
          }
        : listing,
    ),
  );
}

function reportOwnerListing(listingId) {
  setOwnerListings((currentListings) =>
    currentListings.map((listing) =>
      listing.id === listingId
        ? {
            ...listing,
            reportCount:
              Number(listing.reportCount || 0) + 1,
            updatedAt: new Date().toISOString(),
          }
        : listing,
    ),
  );
}

function clearListingReports(listingId) {
  setOwnerListings((currentListings) =>
    currentListings.map((listing) =>
      listing.id === listingId
        ? {
            ...listing,
            reportCount: 0,
            updatedAt: new Date().toISOString(),
          }
        : listing,
    ),
  );
}

  function addRoomToListing(listingId, roomData) {
    const newRoom = {
      id: `room-${Date.now()}`,
      ...roomData,
    };

    setOwnerListings((currentListings) =>
      currentListings.map((listing) =>
        listing.id === listingId
          ? {
              ...listing,
              rooms: [...listing.rooms, newRoom],
              updatedAt: new Date().toISOString(),
            }
          : listing,
      ),
    );

    return newRoom;
  }

  function updateListingRoom(
    listingId,
    roomId,
    roomUpdates,
  ) {
    setOwnerListings((currentListings) =>
      currentListings.map((listing) =>
        listing.id === listingId
          ? {
              ...listing,
              rooms: listing.rooms.map((room) =>
                room.id === roomId
                  ? {
                      ...room,
                      ...roomUpdates,
                    }
                  : room,
              ),
              updatedAt: new Date().toISOString(),
            }
          : listing,
      ),
    );
  }

  function removeRoomFromListing(listingId, roomId) {
    setOwnerListings((currentListings) =>
      currentListings.map((listing) =>
        listing.id === listingId
          ? {
              ...listing,
              rooms: listing.rooms.filter(
                (room) => room.id !== roomId,
              ),
              updatedAt: new Date().toISOString(),
            }
          : listing,
      ),
    );
  }

  const currentUserBookings = useMemo(() => {
    if (!user) {
      return [];
    }

    return bookingRequests.filter(
      (booking) =>
        booking.userId === user.id ||
        booking.userEmail === user.email,
    );
  }, [bookingRequests, user]);

  const currentOwnerListings = useMemo(() => {
    if (!user || user.role !== "owner") {
      return [];
    }

    return ownerListings.filter(
      (listing) =>
        listing.ownerId === user.id ||
        listing.ownerEmail === user.email,
    );
  }, [ownerListings, user]);

  const currentOwnerBookingRequests = useMemo(() => {
    if (!user || user.role !== "owner") {
      return [];
    }

    const ownerHostelNames = [
      user.hostelName,
      ...currentOwnerListings.map(
        (listing) => listing.name,
      ),
    ]
      .filter(Boolean)
      .map((name) => name.trim().toLowerCase());

    return bookingRequests.filter((booking) =>
      ownerHostelNames.includes(
        booking.hostelName.trim().toLowerCase(),
      ),
    );
  }, [
    bookingRequests,
    currentOwnerListings,
    user,
  ]);

  const contextValue = useMemo(
    () => ({
      favouriteHostelIds,
      favouriteCount: favouriteHostelIds.length,

      bookingRequests,
      currentUserBookings,
      currentOwnerBookingRequests,

      ownerListings,
      currentOwnerListings,

      isFavourite,
      toggleFavourite,

      createBookingRequest,
      cancelBookingRequest,
      updateBookingStatus,

      createOwnerListing,
      updateOwnerListing,
      deleteOwnerListing,
      toggleListingPublication,

      submitListingForApproval,
approveOwnerListing,
rejectOwnerListing,
toggleListingSuspension,
reportOwnerListing,
clearListingReports,

      addRoomToListing,
      updateListingRoom,
      removeRoomFromListing,
    }),
    [
      favouriteHostelIds,
      bookingRequests,
      currentUserBookings,
      currentOwnerBookingRequests,
      ownerListings,
      currentOwnerListings,
    ],
  );

  return (
    <MarketplaceContext.Provider value={contextValue}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);

  if (!context) {
    throw new Error(
      "useMarketplace must be used inside MarketplaceProvider.",
    );
  }

  return context;
}