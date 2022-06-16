import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";
import UpdootSection from "../components/UpdootSection";
import { useDeletePostMutation, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  const [, deletePost] = useDeletePostMutation();

  if (!fetching && !data) {
    return <div>something went wrong</div>;
  }
  const dataPosts = data?.posts.posts;
  return (
    <Layout variant='regular'>
      <Flex align='center'>
        <Heading>LiReddit</Heading>
      </Flex>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {dataPosts?.map((p) => (
            <Box key={p.id} p={5} shadow='md' borderWidth='1px'>
              <Flex>
                <UpdootSection post={p} />
                <Box>
                  <NextLink href='/post/[id]' as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize='xl'>{p.title}</Heading>
                    </Link>
                  </NextLink>

                  <Text>posted by {p.creator.username}</Text>
                  <Text mt={4}>{p.textSnippet}</Text>
                  <IconButton
                    ml='auto'
                    variant='red'
                    icon={<DeleteIcon />}
                    aria-label='Delete Post'
                    onClick={() => {
                      deletePost({ id: p.id });
                    }}
                  />
                </Box>
              </Flex>
            </Box>
          ))}
        </Stack>
      )}
      {data?.posts.hasMore && (
        <Flex>
          <Button
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: dataPosts?.at(-1)?.createdAt!,
              })
            }
            isLoading={fetching}
            m='auto'
            my={8}
          >
            load more
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
