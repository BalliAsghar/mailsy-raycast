import { Detail, List, Icon } from "@raycast/api";
import { useEffect, useState } from "react";
import {ShowInfo} from "./utils";
export default function Command() {
    const [info, setInfo] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function response() {
          const emails = await ShowInfo();
          console.log(emails);
            setInfo(emails);  
            setLoading(false);
      }
        response();
    }, []);


    return (
        <List
        isLoading={loading}
        navigationTitle="Mails"
        >
      
        <List.Item
        icon={Icon.Dot}
          key={info.id}
          title={"ID:"}
          subtitle={info.id}
        />
        <List.Item
        icon={Icon.Envelope}
          key={info.address}
          title={"Email:"}
          subtitle={info.address}
        />
        <List.Item
        icon={Icon.Calendar}
          key={info.createdAt}
          title={"CreatedAt:"}
          subtitle={new Date(info.createdAt).toLocaleString()}
        />
    

        </List>
    )
  }