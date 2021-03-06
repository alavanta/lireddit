import { Box, Heading } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

const Post = ({}) => {
  const [{ data, error, fetching }] = useGetPostFromUrl();
  if (fetching) {
    return (
      <Layout variant='small'>
        <div>...loading</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.post) {
    return (
      <Layout variant='small'>
        <Box>could not find post</Box>
      </Layout>
    );
  }
  return (
    <Layout variant='small'>
      <Heading mb={4}>{data?.post?.title}</Heading>
      <p>{data?.post?.text}</p>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
