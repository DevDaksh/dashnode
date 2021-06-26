import { fireAuth, googleProvider } from "../utils/firebase";
import { useRouter } from "next/router";
import { Flex, Button, Heading, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import { useAuthState } from "../utils/authState";

function auth() {
  const router = useRouter();
  const [isLoggedIn, uid] = useAuthState();
  const login = () => {
    fireAuth
      .signInWithPopup(googleProvider)
      .then((res) => {
        var { uid } = res.user;
        localStorage.setItem("uid", uid);
        router.push("/app");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const formBackground = useColorModeValue("gray.100", "gray.700");
  if (isLoggedIn) {
    router.push("/app");
    return (
      <Flex aligmItems="center" justifyContent="center" p={10}>
        <Heading>Already signed in!</Heading>
      </Flex>
    );
  } else {
    return (
      <>
        <Head>
          <title>Authenticate // Dree</title>
        </Head>
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <Flex
            direction="column"
            background={formBackground}
            p={12}
            rounded={6}
          >
            <Heading mb={6}>Log In / Signup</Heading>
            <Button colorScheme="teal" mt={4} px={5} py={4} onClick={login}>
              Login with Google
            </Button>
          </Flex>
        </Flex>
      </>
    );
  }
}

export default auth;