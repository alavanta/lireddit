import React from "react";
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching }, logout] = useLogoutMutation();
  const [{ data }] = useMeQuery({
    pause: isServer(),
  });

  let content = null;
  if (!data?.me) {
    content = (
      <>
        <NextLink href='/login'>
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href='/register'>
          <Link>register</Link>
        </NextLink>
      </>
    );
  }
  if (data?.me) {
    content = (
      <Flex gap={2}>
        <Box>{data.me.username}</Box>
        <Button isLoading={fetching} onClick={() => logout()} variant='link'>
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex
      position='sticky'
      top={0}
      zIndex={1}
      padding={4}
      bg='tan'
      align='center'
    >
      <NextLink href='/'>
        <Link>
          <Heading>LiReddit</Heading>
        </Link>
      </NextLink>
      <NextLink href='/create-post'>
        <Button ml='auto' mr={4}>
          create post
        </Button>
      </NextLink>
      <Box>{content}</Box>
    </Flex>
  );
};

export default NavBar;
