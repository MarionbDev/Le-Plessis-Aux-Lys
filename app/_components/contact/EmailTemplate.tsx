import { Container } from "@react-email/container";
import { Heading } from "@react-email/heading";
import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";
import { Text } from "@react-email/text";

type PropType = {
  firstname: string;
  lastname: string;
  email: string;
  message: string;
};

const EmailTemplate = ({ firstname, lastname, email, message }: PropType) => (
  <Tailwind>
    <Html>
      <Container className=" px-10 pt-8 pb-12 rounded-lg  bg-[#efefe3]">
        <Heading as="h3">
          Message de {firstname} {lastname} :
        </Heading>
        <Text>{message}</Text>
        <Text> Voici mon email : {email} </Text>
      </Container>
    </Html>
  </Tailwind>
);

export default EmailTemplate;

