import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "hostelhub_mock_session";

function readStoredUser() {
  try {
    const storedSession = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!storedSession) {
      return null;
    }

    return JSON.parse(storedSession);
  } catch (error) {
    console.error("Unable to read the stored session:", error);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(user),
      );
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

function login({
  email,
  password,
  role = "customer",
}) {
  const normalizedEmail = email.trim().toLowerCase();

  const isAdminAccount =
    normalizedEmail === "admin@hostelhub.demo" &&
    password === "Admin123";

  const isOwnerAccount =
    normalizedEmail === "owner@hostelhub.demo" &&
    password === "Owner123";

  let resolvedRole = role;
  let displayName = "";

  if (isAdminAccount) {
    resolvedRole = "admin";
    displayName = "HostelHub Admin";
  } else if (isOwnerAccount) {
    resolvedRole = "owner";
    displayName = "Demo Hostel Owner";
  } else {
    resolvedRole = "customer";

    displayName = normalizedEmail
      .split("@")[0]
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (character) =>
        character.toUpperCase(),
      );
  }

  const mockUser = {
    id: isAdminAccount
      ? "admin-user"
      : isOwnerAccount
        ? "owner-demo-user"
        : Date.now(),

    fullName: displayName || "HostelHub User",
    email: normalizedEmail,
    role: resolvedRole,

    hostelName: isOwnerAccount
      ? "Demo Capital Hostel"
      : "",

    phoneNumber: isOwnerAccount
      ? "03001234567"
      : "",

    loginTime: new Date().toISOString(),
  };

  setUser(mockUser);

  return mockUser;
}

  function register({
    fullName,
    email,
    phoneNumber,
    role,
    hostelName,
  }) {
    const mockUser = {
      id: Date.now(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      role,
      hostelName:
        role === "owner" ? hostelName.trim() : "",
      loginTime: new Date().toISOString(),
    };

    setUser(mockUser);

    return mockUser;
  }

  function logout() {
    setUser(null);
  }

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider.",
    );
  }

  return context;
}