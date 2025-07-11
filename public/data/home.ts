import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export const homeData = {
  // To use your own photo, just place it in /public/assets and write the link as I did: eg: /assets/my_image.jpg
  // Of course it's best to convert your image file type to webp for better performance on the web!
  // The links are optional
  myImage: "/assets/صورة واتساب بتاريخ 2025-07-10 في 17.25.44_2e31ef5e.jpg",
  contactInfo: [
    {
      Icon: IoMdMail,
      Label: "abdallaelshahat58@gmail.com",
      Link: "/contact", // This refers to the Contact page in the website, you can change it to whatever you like
    },
    {
      Icon: FaLocationDot,
      Label: "Cairo, Egypt",
      Link: "...", // This is just a simple location of my city
    },
    {
      Icon: FaPhoneAlt,
      Label: "+201026215207",
      Link: "tel:+201115337822",
    },
  ],
  education: [
    {
      Icon: FaUniversity,
      Label: "Tanta University",
      Link: "https://tanta.edu.eg/",
    },
    {
      Icon: FaGraduationCap,
      Label: "Bachelor's Degree in Computer Science",
      Link: "https://ci.tanta.edu.eg/en/",
    },
  ],
  social: [
    {
      Icon: FaGithub,
      Label: "GitHub",
      Link: "https://github.com/Abdalla-elshahat",
    },
    {
      Icon: FaLinkedin,
      Label: "LinkedIn",
      Link: "https://www.linkedin.com/in/abdalla-elshahat-496213371?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      Icon: FaFacebook,
      Label: "Facebook",
      Link: "https://www.facebook.com/abdallah.el.shahat.315567/",
    },
    {
      Icon: FaInstagram,
      Label: "Instagram",
      Link: "https://www.instagram.com/abdalla_elshaht/",
    },
  ],
};
