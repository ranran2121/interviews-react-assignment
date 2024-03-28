import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const drawerWidth = 180;

export const categories = [
  "Fruit",
  "Vegetables",
  "Dairy",
  "Bakery",
  "Meat",
  "Seafood",
  "Snacks",
  "Beverages",
];

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
            style={{ backgroundColor: category === text ? "#1976d2" : "" }}
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
