import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

const DS_MS = 1000 * 60 * 60 * 24;

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        return {
          email: params.email as string,
          name: params.name as string,
        };
      },
    }),
  ],
  session: {
    totalDurationMs: DS_MS * 7,
    inactiveDurationMs: DS_MS,
  },
});
