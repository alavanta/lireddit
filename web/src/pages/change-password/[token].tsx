import React, { useState } from "react";
import { NextPage } from "next";
import { Box, Button, Link, Flex } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/router";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";
import { useChangePasswordMutation } from "../../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import NextLink from "next/link";

export const ChangePassword: NextPage = () => {
  const [, changePassword] = useChangePasswordMutation();
  const [errorToken, setErrorToken] = useState("");
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{
          newPassword: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const _token = router.query.token;
          const response = await changePassword({
            token: typeof _token === "string" ? _token : "",
            newPassword: values.newPassword,
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setErrorToken(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='newPassword'
              placeholder='new password'
              label='New Password'
              type='password'
            />
            {errorToken && (
              <Flex>
                <Box mr={2} color='red'>
                  {errorToken}
                </Box>
                <NextLink href='/forgot-password'>
                  <Link>click here to get a new one</Link>
                </NextLink>
              </Flex>
            )}
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={isSubmitting}
              type='submit'
            >
              change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
