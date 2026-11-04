export async function getAuthToken(): Promise<string> {
  const response = await fetch("/api/auth/token", {
    cache: "no-store",
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Please sign in again to continue.");
    }
    throw new Error(`Could not get an auth token (${response.status}).`);
  }

  const result: unknown = await response.json();
  if (
    typeof result !== "object" ||
    result === null ||
    !("token" in result) ||
    typeof result.token !== "string"
  ) {
    throw new Error("The auth server returned an invalid token response.");
  }

  return result.token;
}
