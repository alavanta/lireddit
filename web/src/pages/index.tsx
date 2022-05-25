import NavBar from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <NavBar />
      <div>hello isekai</div>
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((s) => (
          <div key={s.id}>
            {s.title}
            <br />
          </div>
        ))
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
