import React, { FC } from "react";
import { Box, Header, Icon, Page, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import subscriptionDecor from "../static/subscription-decor.svg";
import { ListRenderer } from "../components/list-renderer";
import { useToBeImplemented } from "../hooks";

const Subscription: FC = () => {
  const onClick = useToBeImplemented();
  return (
    <Box className="m-4" onClick={onClick}>
      <Box
        className="bg-green text-white rounded-xl p-4 space-y-2"
        style={{
          backgroundImage: `url(${subscriptionDecor})`,
          backgroundPosition: "right 8px center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Text.Title className="font-bold">
          Register to become a new member
        </Text.Title>
        <Text size="xxSmall">
          Accumulate points to redeem rewards, expand utilities
        </Text>
      </Box>
    </Box>
  );
};

const Personal: FC = () => {
  const navigate = useNavigate();

  const handleAccountClick = () => {
    navigate("/AccountDetails"); // Navigate to AccountDetails page
  };

  const handleHistoryClick = () => {
    // Handle history navigation or functionality
    navigate("/history");
  };

  return (
    <Box className="m-4">
      <ListRenderer
        title="Personal"
        items={[
          {
            left: <Icon icon="zi-user" />,
            right: (
              <Box flex onClick={handleAccountClick}>
                <Text.Header className="flex-1 items-center font-normal">
                  Account information
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
          {
            left: <Icon icon="zi-clock-2" />,
            right: (
              <Box flex onClick={handleHistoryClick}>
                <Text.Header className="flex-1 items-center font-normal">
                  History
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};

const Other: FC = () => {
  const onClick = useToBeImplemented();

  return (
    <Box className="m-4">
      <ListRenderer
        title="Other"
        onClick={onClick}
        items={[
          {
            left: <Icon icon="zi-star" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Reviews
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
          {
            left: <Icon icon="zi-call" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Contact and feedback
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};

const ProfilePage: FC = () => {
  return (
    <Page>
      <Header
        title="Personal"
        showBackIcon={false}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
      />
      <Subscription />
      <Personal />
      <Other />
    </Page>
  );
};

export default ProfilePage;
