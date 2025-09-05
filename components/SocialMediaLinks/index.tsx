import { logos } from "@/components/socialLinks";

import styles from "./component.module.css";

export const LMSocialMediaLinks = () => {
  return (
    <ul
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <li className={styles.socialMediaLogo}>
        <a href="">{logos.twitter}</a>
      </li>
      <li className={styles.socialMediaLogo}>
        <a href="">{logos.instagram}</a>
      </li>
    </ul>
  );
};
