import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
  const handleVote = async (value: number) => {
    if (value === post.voteStatus) {
      return;
    }
    setLoadingState(value === 1 ? "updoot-loading" : "downdoot-loading");
    await vote({
      value,
      postId: post.id,
    });
    setLoadingState("not-loading");
  };
  return (
    <Flex direction='column' justifyContent='center' alignItems='center' mr={4}>
      <IconButton
        onClick={() => handleVote(1)}
        aria-label='updoot post'
        bgColor={post.voteStatus === 1 ? "green.500" : undefined}
        icon={<ChevronUpIcon />}
        isLoading={loadingState === "updoot-loading"}
      />
      {post.points}
      <IconButton
        onClick={() => handleVote(-1)}
        aria-label='downdoot post'
        bgColor={post.voteStatus === -1 ? "red.500" : undefined}
        icon={<ChevronDownIcon />}
        isLoading={loadingState === "downdoot-loading"}
      />
    </Flex>
  );
};

export default UpdootSection;
