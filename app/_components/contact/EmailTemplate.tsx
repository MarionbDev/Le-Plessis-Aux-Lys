import { Container } from "@react-email/container";
import { Heading } from "@react-email/heading";
import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";
import { Text } from "@react-email/text";
import styles from "./emailTemplate.module.css";

type PropType = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
};

const capitalizeFirstLetter = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

const formatPhoneNumber = (phone: string): string => {
  return phone.replace(/(\d{2})(?=\d)/g, "$1 "); // Adds a space after every two digits
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}`
  : "https://le-plessis-aux-lys.fr";

const EmailTemplate = ({
  firstname,
  lastname,
  email,
  message,
  phone,
}: PropType) => (
  <Tailwind>
    <Html className=" bg-white">
      <Container className={styles.container}>
        <img
          src={`${baseUrl}/title.png`}
          alt="nom du site"
          className="-ml-6 mb-2"
        />

        <Heading as="h3" className=" font-medium">
          Vous avez reçu un nouveau message,
        </Heading>
        <section>
          <Text className="text-[14px]">
            {capitalizeFirstLetter(firstname)} {capitalizeFirstLetter(lastname)}
          </Text>
          <Text className="text-[14px]">
            {" "}
            Email :{" "}
            <a href={`mailto:${email}`} className="text-blue-500">
              {email}
            </a>
          </Text>
          <Text className="text-[14px]">
            Téléphone : {formatPhoneNumber(phone)}
          </Text>
        </section>
        <section>
          <Text className=" leading-7 text-[14px]">
            {capitalizeFirstLetter(message)}
          </Text>
        </section>
      </Container>
    </Html>
  </Tailwind>
);

export default EmailTemplate;

