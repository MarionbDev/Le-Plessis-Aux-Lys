import { Container } from "@react-email/container";
import { Heading } from "@react-email/heading";
import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";
import { Text } from "@react-email/text";

type PropType = {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  message: string;
};

const capitalizeFirstLetter = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

const EmailTemplate = ({
  firstname,
  lastname,
  email,
  message,
  phone,
}: PropType) => (
  <Tailwind>
    <Html>
      <Container
        style={{
          padding: "1rem",
          backgroundColor: "rgb(255, 252, 252)",
          borderRadius: "8px",
          maxWidth: "560px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Heading as="h3">
          Message de {capitalizeFirstLetter(firstname)}{" "}
          {capitalizeFirstLetter(lastname)}
        </Heading>

        <Text style={{ marginRight: "0.5rem" }}>Email : {email}</Text>

        <Text style={{ marginRight: "0.5rem" }}>Téléphone : {phone}</Text>

        <Text style={{ marginBottom: "0.5rem" }}>Message :</Text>
        <Text>{capitalizeFirstLetter(message)}</Text>
      </Container>
    </Html>
  </Tailwind>
);

export default EmailTemplate;

