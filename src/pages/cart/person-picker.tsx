import { ListItem } from "../../components/list-item";
import React, { FC } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { phoneState, requestPhoneTriesState, userState } from "../../state";

export const PersonPicker: FC = () => {
  const user = useRecoilValue(userState);
  const phone = useRecoilValue(phoneState);

  if (!phone) {
    return <RequestPersonPickerPhone />;
  }

  return <ListItem title={`${user.name} - ${phone}`} subtitle="Receiver" />;
};

export const RequestPersonPickerPhone: FC = () => {
  const retry = useSetRecoilState(requestPhoneTriesState);
  return (
    <ListItem
      onClick={() => retry((r) => r + 1)}
      title="Choose a recipient"
      subtitle="Request phone number access"
    />
  );
};
