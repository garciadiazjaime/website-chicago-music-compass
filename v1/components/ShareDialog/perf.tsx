import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

interface Props {
  url: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareDialog = ({ url, open }: Props) => {
  return (
    <div
      style={{
        left: "-160px",
        width: 160,
        position: "absolute",
        padding: "0 12px",
        gap: 12,
        height: "100%",
        backgroundColor: "rgb(23 37 84)",
        display: open ? "flex" : "none",
      }}
    >
      <FacebookShareButton url={url}>
        <FacebookIcon size={24} round />
      </FacebookShareButton>

      <WhatsappShareButton url={url}>
        <WhatsappIcon size={24} round />
      </WhatsappShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon size={24} round />
      </TwitterShareButton>

      <EmailShareButton url={url}>
        <EmailIcon size={24} />
      </EmailShareButton>
    </div>
  );
};

export default ShareDialog;
