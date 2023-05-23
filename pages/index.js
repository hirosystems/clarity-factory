import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className={styles.container}>
      <Head>
        <title>Clarity Factory</title>
        <meta
          name="description"
          content="Create smart contracts with no code."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex as="main" direction="column" maxW="800px" mt="8" mx="auto" gap="8">
        <Heading>NFT Contract Builder</Heading>
        <Flex
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          flexDirection="column"
          gap="2"
        >
          {/* register your input into the hook by invoking the "register" function */}
          <Input defaultValue="test" {...register("example")} />

          {/* include validation with required or other standard HTML validation rules */}
          <Input {...register("exampleRequired", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}

          <Button type="submit">Save</Button>
        </Flex>
      </Flex>

      <Flex as="footer" position="fixed" left="0" right="0" bottom="0">
        <Flex
          as="a"
          align="center"
          mx="auto"
          py="3"
          href="https://hiro.so"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by
          <Box className={styles.logo} ml="2">
            <Image src="/logo.png" alt="Hiro Logo" width={30} height={30} />
          </Box>
        </Flex>
      </Flex>
    </div>
  );
}
