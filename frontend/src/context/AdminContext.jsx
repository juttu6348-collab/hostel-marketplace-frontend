import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import platformUsers from "../data/platformUsers";

const AdminContext = createContext(null);

const ADMIN_USERS_STORAGE_KEY =
  "hostelhub_admin_users";

function readStoredUsers() {
  try {
    const storedUsers = localStorage.getItem(
      ADMIN_USERS_STORAGE_KEY,
    );

    if (!storedUsers) {
      return platformUsers;
    }

    return JSON.parse(storedUsers);
  } catch (error) {
    console.error(
      "Unable to read admin users:",
      error,
    );

    return platformUsers;
  }
}

export function AdminProvider({ children }) {
  const [users, setUsers] = useState(readStoredUsers);

  useEffect(() => {
    localStorage.setItem(
      ADMIN_USERS_STORAGE_KEY,
      JSON.stringify(users),
    );
  }, [users]);

  function toggleUserSuspension(userId) {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status:
                user.status === "suspended"
                  ? "active"
                  : "suspended",
            }
          : user,
      ),
    );
  }

  function changeUserRole(userId, role) {
    const allowedRoles = ["customer", "owner"];

    if (!allowedRoles.includes(role)) {
      return;
    }

    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              role,
            }
          : user,
      ),
    );
  }

  function deleteUser(userId) {
    setUsers((currentUsers) =>
      currentUsers.filter(
        (user) => user.id !== userId,
      ),
    );
  }

  const statistics = useMemo(() => {
    return {
      totalUsers: users.length,

      activeUsers: users.filter(
        (user) => user.status === "active",
      ).length,

      suspendedUsers: users.filter(
        (user) => user.status === "suspended",
      ).length,

      ownerUsers: users.filter(
        (user) => user.role === "owner",
      ).length,

      customerUsers: users.filter(
        (user) => user.role === "customer",
      ).length,
    };
  }, [users]);

  const value = useMemo(
    () => ({
      users,
      statistics,
      toggleUserSuspension,
      changeUserRole,
      deleteUser,
    }),
    [users, statistics],
  );

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error(
      "useAdmin must be used inside AdminProvider.",
    );
  }

  return context;
}