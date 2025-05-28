import React, { useEffect, useState } from "react";
import {
  SbBlokData,
  StoryblokComponent,
  storyblokEditable,
} from "@storyblok/react";
import axios from "axios";
import XMLImporter from "./XMLImporter";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import type { ImportedData } from "../Suport/Suport";

interface PageProps {
  blok: SbBlokData & {
    body?: SbBlokData[];
  };
}
interface JsonData {
  root: any;
}

const Pages = ({ blok }: PageProps) => {
  const [openBlock, setOpenBlock] = useState(false);
  const [openStory, setOpenStory] = useState(false);
  const [fields, setFields] = useState({
    text: false,
    textarea: false,
    richtext: false,
    markdown: false,
    number: false,
    singleOption: false,
    asset: false,
    image: false,
  });

  const handleSwitchChange = (field: any) => (event: any) => {
    setFields({ ...fields, [field]: event.target.checked });
  };
  const fieldConfigs = [
    { key: "text", label: "Text Field", placeholder: "Text Field Name" },
    {
      key: "textarea",
      label: "Textarea Field",
    },
    {
      key: "richtext",
      label: "Richtext Field",
      placeholder: "Richtext Field Name",
    },
    {
      key: "markdown",
      label: "Markdown Field",
      placeholder: "Markdown Field Name",
    },
    { key: "number", label: "Number Field", placeholder: "Number Field Name" },
    {
      key: "singleOption",
      label: "Single-Option Field",
      placeholder: "Single-Option Field Name",
    },
    { key: "asset", label: "Asset Field", placeholder: "Asset Field Name" },
    { key: "image", label: "Image Field", placeholder: "Image Field Name" },
  ];

  const handleClickOpenBlock = () => {
    setOpenBlock(true);
  };

  const handleCloseBlock = () => {
    setOpenBlock(false);
  };
  const handleClickOpenStory = () => {
    setOpenStory(true);
  };

  const handleCloseStory = () => {
    setOpenStory(false);
  };
  const [jsonData, setJsonData] = useState<JsonData>();
  const [importedData, setImportedData] = useState<ImportedData>();
  useEffect(() => {
    if (jsonData && jsonData.root) {
      console.log("Imported json obj====", jsonData.root);
      setImportedData(jsonData.root);
    } else {
      console.warn("jsonData or jsonData.root is undefined or null");
    }
  }, [jsonData]);
  console.log("pages blok =====", blok);
  const blockhHeader = {
    name: "new_test_3",
    display_name: null,
    schema: {
      headline: {
        type: "textarea",
        pos: 0,
        translatable: true,
        description: "This field is used to render an H1 title",
      },
      firstName: {
        type: "text",
        pos: 0,
        translatable: true,
        description: "This field is used to render an H2 title",
      },
      lastName: {
        type: "text",
        pos: 0,
        translatable: true,
        description: "This field is used to render an H3 title",
      },
      salary: {
        type: "number",
        pos: 0,
        translatable: true,
        description: "This field is used to render an H3 title",
      },
    },
    is_root: false,
    is_nestable: true,
  };
  const storyheaders = {
    name: importedData?.story.name,
    slug: importedData?.story.slug,
    parent_id: null,
    content: {
      component: importedData?.story.content.body.component,
    },
    user_ids: [],
    space_role_ids: [],
    is_startpage: false,
    preset_id: null,
    translated_slugs_attributes: [],
  };
  const managementApi = axios.create({
    baseURL: "https://app.storyblok.com/v1",
    headers: {
      Authorization: "dVkWGfTr2LUoEQvimi7EHQtt-291155--aWMXgdEPN-BRm3Rzkkn",
    },
  });
  const createBlock = async () => {
    managementApi
      .post("/spaces/340036/components", {
        component: blockhHeader,
      })
      .then((response: any) => {
        console.log("block res ======", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createStory = async () => {
    managementApi
      .post("/spaces/340036/stories", {
        ...storyheaders,
      })
      .then((response: any) => {
        console.log("block creation res====", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Storyblok Main Page
            </Typography>
            {/* <Button color="inherit" onClick={createBlock}>
              Block
            </Button>
            <Button color="inherit" onClick={createStory}>
              Story
            </Button> */}
          </Toolbar>
        </AppBar>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 6, md: 6 }}>
            <Card>
              <CardContent sx={{ height: "100%" }}>
                <Box display="flex" justifyContent="flex-end" mb={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={handleClickOpenBlock}
                  >
                    Create Block
                  </Button>
                </Box>
                <Typography variant="h5" component="div">
                  Block
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  block content
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item size={{ xs: 6, md: 6 }}>
            <Card>
              <CardContent sx={{ height: "100%" }}>
                <Box display="flex" justifyContent="flex-end" mb={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={handleClickOpenStory}
                  >
                    Create Story
                  </Button>
                </Box>
                <Typography variant="h5" component="div">
                  Story
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Story content
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={openBlock} onClose={handleCloseBlock}>
        <DialogTitle>Create New Block</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item size={{ xs: 12, md: 12 }}>
              <TextField
                autoFocus
                margin="dense"
                label="Block Name"
                fullWidth
                size="small"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <FormGroup>
            {fieldConfigs.map((field) => (
              <Box key={field.key} mb={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={fields[field.key]}
                      onChange={handleSwitchChange(field.key)}
                    />
                  }
                  label={field.label}
                />
                {fields[field.key] && (
                  <TextField
                    fullWidth
                    size="small"
                    margin="dense"
                    variant="outlined"
                    label={field.placeholder}
                  />
                )}
              </Box>
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseBlock}
            variant="contained"
            color="primary"
          >
            Create Block
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openStory} onClose={handleCloseStory}>
        <DialogTitle>Create New Story</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            label="Story Name"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseStory}
            variant="contained"
            color="primary"
          >
            Create Story
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Pages;

//  <Container maxWidth={false} sx={{ paddingY: 2 }}>
{
  /* <Grid container spacing={2}>
          <Grid item xs={12}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Storyblok Main Page
                </Typography>
                <Button color="inherit" onClick={createBlock}>
                  Create Block
                </Button>
                <Button color="inherit" onClick={createStory}>
                  Create Story
                </Button>
                <Button color="inherit">
                  <XMLImporter jsonData={jsonData} setJsonData={setJsonData} />
                </Button>
              </Toolbar>
            </AppBar>
          </Grid>
        </Grid> */
}
{
  /* <Grid container spacing={2}>
          <Grid item xs={12}>
            <main {...storyblokEditable(blok)}>
              <Grid container spacing={2}>
                {blok?.body?.map((nestedBlok) => (
                  <Grid item xs={4} md={6} lg={4} key={nestedBlok._uid}>
                    <StoryblokComponent blok={nestedBlok} />
                  </Grid>
                ))}
              </Grid>
            </main>
          </Grid>
        </Grid> */
}
{
  /* </Container> */
}
