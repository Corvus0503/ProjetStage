import React from 'react'
import { LockOpen, Person } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Divider,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { FlexBetween, FlexBox } from "../../FlexBox";
import { H4, Small } from "../../Typography";

const ContentBox = styled(FlexBox)({
  alignItems: "center",
  flexDirection: "column",
});

const StyedSmall = styled(Small)({
  color: "#08ad6c",
  padding: "2px 4px",
  borderRadius: "4px",
  background: "rgba(9, 182, 109, 0.15)",
});

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "13px",
  color: theme.palette.text.primary,
  ":hover": { background: "transparent" },
}));

const Profile = ({user}) => {
    console.log(user)
    return (
        <Card sx={{ pt: 3 }} elevation={3}>
          <ContentBox mb={3} alignContent="center">
          
            <H4 sx={{ mt: "16px", mb: "8px" }}>{user[0].NOM_AG} {user[0].PRENOM_AG}</H4>
            <Small color="text.secondary">{user[0].FONCTION_AG}</Small>
          </ContentBox>
    
          <Divider />
    
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ pl: 2 }}>Email</TableCell>
                <TableCell>
                  <div>ui-lib@example.com</div>
                  <StyedSmall>Email Verified</StyedSmall>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 2 }}>Nom d'utilisteur</TableCell>
                <TableCell>{user[0].NOM_UTIL_AG}</TableCell>
            </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 2 }}>Nom</TableCell>
                <TableCell>{user[0].NOM_AG}</TableCell>
            </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 2 }}>Nom</TableCell>
                <TableCell>{user[0].NOM_AG}</TableCell>
            </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 2 }}>Nom</TableCell>
                <TableCell>{user[0].NOM_AG}</TableCell>
            </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 2 }}>Nom</TableCell>
                <TableCell>{user[0].NOM_AG}</TableCell>
            </TableRow>
    
            </TableBody>
          </Table>
    
        </Card>
      );
    };
    
    const customerInfo = [
      { title: "Phone", value: "+1 439 327 546" },
      { title: "Country", value: "USA" },
      { title: "State/Region", value: "New York" },
      { title: "Address 1", value: "Street Tailwood, No. 17" },
      { title: "Address 2", value: "House #19" },
    ];
export default Profile