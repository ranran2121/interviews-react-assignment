import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { theme } from "./styles/theme";
import { categories } from "./mocks/categories";

const drawerWidth = 180;

export const Categories = ({
  setCategory,
  category,
}: {
  setCategory: (data: string | null) => void;
  category: string | null;
}) => {
  return (
    <Box minWidth={drawerWidth} sx={{ borderRight: "1px solid grey" }}>
      <List>
        {categories.map((text) => (
          <ListItem
            key={text}
            disablePadding
            data-testid={text}
            onClick={() => setCategory(text)}
            style={{
              backgroundColor:
                category === text ? theme.palette.primary.main : "",
            }}
          >
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem key="all" disablePadding onClick={() => setCategory(null)}>
          <ListItemButton>
            <ListItemText primary={"All"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};
