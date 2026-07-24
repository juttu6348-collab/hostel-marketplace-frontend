const ROUTES = {
  HOME: "/",
  HOSTELS: "/hostels",
  HOSTEL_DETAILS: "/hostels/:hostelId",

  LOGIN: "/login",
  REGISTER: "/register",
  ACCOUNT: "/account",

  FAVOURITES: "/favourites",
  BOOKING_REQUEST: "/hostels/:hostelId/booking",

  OWNER_DASHBOARD: "/owner/dashboard",
  ADMIN_DASHBOARD: "/admin/dashboard",
};

export function getHostelDetailsRoute(hostelId) {
  return `/hostels/${hostelId}`;
}

export function getBookingRequestRoute(hostelId) {
  return `/hostels/${hostelId}/booking`;
}

export function getLoginRoute(redirectPath = "") {
  if (!redirectPath) {
    return ROUTES.LOGIN;
  }

  const searchParameters = new URLSearchParams({
    redirect: redirectPath,
  });

  return `${ROUTES.LOGIN}?${searchParameters.toString()}`;
}

export default ROUTES;