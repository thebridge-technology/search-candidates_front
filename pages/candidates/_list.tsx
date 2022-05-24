import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Chip, Stack } from "@mui/material";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CustomPaper = styled(Paper)`
  margin: 20px 10px;
`;

const CustomChip = styled(Chip)`
  margin: 10px 5px;
`;

const Skills = styled('div')`
  display: block;
`;

const CardItem: React.FC<IItemCard> = ({ item }: IItemCard) => {
  const [expanded, setExpanded] = React.useState(false);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  return (
    <CustomPaper elevation={3}>
      <Card>
        <CardHeader
          title={item.name}
          subheader={item.email}
        />
        <CardContent>
          <div>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
              {item.formation ? <Chip label={item.formation} color="primary"/> : null}
              {item.level ? <Chip label={item.level} color="success"/> : null}
            </Stack>
            <div>
              {item.city ? <div><AddLocationIcon/>{item.city}, <span>{item.state}</span></div> : null}
            </div>
            <div>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                {item.skill ? item.skill.split(",").map((value) => <Chip label={value}/>) : null}
              </Stack>
            </div>
            <div>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                {item.language ? item.language.split(",").map((value) => <Chip label={value}/>) : null}
              </Stack>
            </div>
            <div>
              <Stack direction="row" spacing={1}>
                {
                  item.phone
                    ? <a href={`https://api.whatsapp.com/send?phone=${item.phone}`} target="_blank"><WhatsAppIcon/></a>
                    : null
                }
                {
                  item.email
                    ? <a href={`mailto: ${item.email}`} target="_blank"><EmailIcon/></a>
                    : null
                }
                {
                  item.linkedin
                    ? <a href={`${item.linkedin}`} target="_blank"><LinkedInIcon/></a>
                    : null
                }
                {
                  item.github
                    ? <a href={`https://github.com/${item.github}`} target="_blank"><GitHubIcon/></a>
                    : null
                }
              </Stack>
            </div>
          </div>
        </CardContent>
      </Card>
    </CustomPaper>
  )
}

interface IItemCard {
  item: ICandidate
}

interface ICandidate {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  linkedin: string | null;
  remote: boolean | null;
  type: string | null;
  tech_stack_expertise: string | null;
  availability_status: string | null;
  candidate_id: string | null;
  candidate_db_source: string | null;
  created_at: string | null;
  consent_gdpr_at: string | null;
  consent_gdpr: string | null;
  date_of_birth: string | null;
  face_to_face_work: string | null;
  hybrid_work: boolean | null;
  salary_range_start: number | null;
  salary_range_finish: number | null;
  marital_status: string | null;
  gender: string | null;
  available_change: boolean | null;
  available_change_cities: string | null;
  dream_company_work: string | null;
  city: string | null;
  country: string | null;
  state: string | null;
  formation: string | null;
  experience: string | null;
  skill: string | null;
  level: string | null;
  frameworks: [] | null;
  languages: [] | null;
  infrastructures: [] | null;
  has_children: string | null;
  github: string | null;
  language: string | null;
}

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function ScrollTop(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');
    
    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };
  
  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

const ListCard = ({ candidates }, props: Props) => {
  return (
    <>
      <span id="back-to-top-anchor"/>
      {candidates ? candidates.map((item) => <CardItem item={item}/>) : null}
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon/>
        </Fab>
      </ScrollTop>
    </>
  );
}

export default ListCard;