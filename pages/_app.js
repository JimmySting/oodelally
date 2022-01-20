import "../styles/globals.css";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";

// Components
import Layout from "../components/Layout";

//  List pages you want to be publicly accessible, or leave empty if
//  every page requires authentication. Use this naming strategy:
//   "/"              for pages/index.js
//   "/foo"           for pages/foo/index.js
//   "/foo/bar"       for pages/foo/bar.js
//   "/foo/[...bar]"  for pages/foo/[...bar].js
const publicPages = ["/"];

function App({ Component, pageProps }) {
  const { pathname } = useRouter();
  const isPublicPage = publicPages.includes(pathname);

  return (
    <ClerkProvider>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        {isPublicPage ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <>
            <SignedIn>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )}
      </SWRConfig>
    </ClerkProvider>
  );
}

export default App;
