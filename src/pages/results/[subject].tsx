import { useRouter } from "next/router";

import { Container, Text, Link, Flex, Divider } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

import { useEffect, useState } from "react";

import STATIC from "../../../static.json";

import Result from "../../components/Result";
import { search } from "@globus/sdk";
import { GMetaResult } from "..";

export default function ResultPage() {
  const router = useRouter();

  const [result, setResult] = useState<GMetaResult>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
      if (!router.query.subject) {
        return;
      }
      const response = await (
        await search.subject.get(STATIC.contents.globus.search.index, {
          query: {
            subject: Array.isArray(router.query.subject)
              ? router.query.subject[0]
              : router.query.subject,
          },
        })
      ).json();
      setIsLoading(false);
      setResult(response);
    }

    fetchResult();
  }, [router.query.subject]);

  return (
    <Container maxW="container.xl" p={4}>
      <Link onClick={() => router.back()}>
        <Flex alignItems="center" mb={4}>
          <ChevronLeftIcon /> <Text fontSize="sm">Back</Text>
        </Flex>
      </Link>

      <Divider my={2} />
      <Result result={result} isLoading={isLoading} />
    </Container>
  );
}
