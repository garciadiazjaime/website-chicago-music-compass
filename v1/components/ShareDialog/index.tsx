import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon } from 'react-share';

interface Props {
  url: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareDialog = ({ url, open }: Props) => {
  return <div className={`-left-40 w-40 absolute px-3 gap-3 h-full bg-blue-950 ${open ? 'flex' : 'hidden'}`}>
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
}

export default ShareDialog;
