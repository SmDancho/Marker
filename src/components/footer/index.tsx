import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { IconButton } from '@mui/material';

export const Footer = () => {
  return (
    <footer className="footer min-h-[200px] flex flex-col items-center justify-between lg:flex-row">
      <div>
        <a href="https://github.com/SmDancho?tab=repositories" target="__blank">
          <IconButton>
            <GitHubIcon />
          </IconButton>
        </a>
        <a
          href="https://www.linkedin.com/in/danil-tereshenko-2301a4242/"
          target="__blank"
        >
          <IconButton>
            <LinkedInIcon />
          </IconButton>
        </a>
      </div>
      <div>
        developed by{' '}
        <a
          href="https://www.linkedin.com/in/danil-tereshenko-2301a4242/"
          target="__blank"
        >
          Danil
        </a>
      </div>
      <div>
        <a href="mailto:dantereshenko69@gmail.com">dantereshenko69@gmail.com</a>
      </div>
    </footer>
  );
};
