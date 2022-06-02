import { Detail, List, Icon } from "@raycast/api";
import { useEffect, useState } from "react";
import {fetchMessages} from "./utils";
export default function Command() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function response() {
          setLoading(true);
          const emails = await fetchMessages();
          console.log(emails);
            setMessages(emails);  
            setLoading(false);
      }
        response();
    }, []);

    return (
        <List
        isLoading={loading}
        navigationTitle="Mails"
        >
           {messages.map((item) => (
        <List.Item
        icon={Icon.Message}
          key={item.id}
          title={item.subject}
          subtitle={item.intro}
          accessories={[
            { text: `${new Date(item.createdAt).toLocaleString()}`, icon: Icon.Calendar },
            {icon: Icon.Person, tooltip: item.from.name},
          ]}
        />
      ))}

        </List>
    )
  }