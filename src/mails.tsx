import { Detail, List, Icon } from "@raycast/api";
import { useEffect, useState } from "react";
import { fetchMessages } from "./utils";
export default function Command() {
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function response() {
      setLoading(true);
      const emails = await fetchMessages();

      !emails && setError("# Create Account First");

      setMessages(emails);
    }
    response();
  }, []);

  if (error) return <Detail markdown={error} />;

  if (messages.length === 0) return <Detail markdown={`# No Emails`} />;

  return (
    <List isLoading={loading} navigationTitle="Mails">
      {messages.map((item) => (
        <List.Item
          icon={Icon.Message}
          key={item.id}
          title={item.subject}
          subtitle={item.intro}
          accessories={[
            { text: `${new Date(item.createdAt).toLocaleString()}`, icon: Icon.Calendar },
            { icon: Icon.Person, tooltip: item.from.name },
          ]}
        />
      ))}
    </List>
  );
}
