import React from "react";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data }] = useMeQuery();
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
        <Button variant='link'>logout</Button>
      </Flex>
    );
  }
  return (
    <Flex padding={4} bg='tomato'>
      <Box ml='auto'>{content}</Box>
    </Flex>
  );
};

export default NavBar;
