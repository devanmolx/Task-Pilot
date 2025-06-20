import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
	name: "Task-Pilot",
	version: "1.0.0"
});

// server.registerTool(
// 	"create Calendar Event",
// 	{
// 		title: "createCalendarEvent",
// 		description: "Create a Google Calendar event",
// 		inputSchema: {
// 			summary: z.string(),
// 			start: z.string(),
// 			end: z.string(),
// 			timezone: z.string(),
// 		},
// 	},
// 	// 2. Define the actual callback
// 	async (
// 		args: { summary: string; start: string; end: string; timezone: string },
// 		extra: RequestHandlerExtra<ServerRequest, ServerNotification>
// 	): Promise<CallToolResult> => {
// 		const { summary, start, end, timezone } = args;

// 		// try {
// 		//   // 🔐 Authenticate with Google Calendar via service account
// 		//   const auth = new google.auth.GoogleAuth({
// 		//     scopes: ["https://www.googleapis.com/auth/calendar"],
// 		//     // or credentialsJson: env.GOOGLE_SERVICE_ACCOUNT_JSON
// 		//   });
// 		//   const calendar = google.calendar({ version: "v3", auth });

// 		//   const response = await calendar.events.insert({
// 		//     calendarId: "primary",
// 		//     requestBody: {
// 		//       summary,
// 		//       start: { dateTime: start, timeZone: timezone },
// 		//       end:   { dateTime: end,   timeZone: timezone },
// 		//     },
// 		//   });

// 		//   const event = response.data;
// 		//   return { type: "success", data: { eventId: event.id, htmlLink: event.htmlLink } };

// 		// } catch (err: any) {
// 		//   console.error("[createCalendarEvent] error:", err);

// 		//   return {
// 		//     type: "error",
// 		//     error: {
// 		//       message: "Failed to create Google Calendar event",
// 		//       details: err.message ?? String(err),
// 		//     },
// 		//   };
// 		// }
// 	}
// );

server.tool(
	"checkIfDentalAppointmentIsAvailable",
	{
		title: "checkIfDentalAppointmentIsAvailable",
		description: "Check if a dental appointment is available at a given timeslot",
		inputSchema: {
			timeslot: z.string(),
		}
	},
	async ({ timeslot }) => {
		//TODO: call your real booking API
		return {
			content: [{ type: "text", text: "Available" }]
		};
	}
);

server.tool(
	"bookDentalAppointment",
	{
		title: "bookDentalAppointment",
		description: "Book a dental appointment at a given timeslot. First check the availability of the timeslot first.",
		inputSchema: {
			timeslot: z.string(),
		}
	},
	async ({ timeslot }) => {
		//TODO: call your real booking API
		return {
			content: [{ type: "text", text: "Booked" }]
		};
	}
);

server.tool(
	"createCalendarEvent",
	{
		title: "createCalendarEvent",
		description: "Create a Google Calendar event",
		inputSchema: {
			summary: z.string(),
			start: z.string(),
			end: z.string(),
			timezone: z.string()
		}
	},
	async ({ start, end, summary, timezone }) => {
		const response = await fetch("https://google.com");
		const data = await response.json();
		return {
			content: [{ type: "text", text: data.length }]
		};
	}
);

const main = async () => {
	const transport = new StdioServerTransport();
	await server.connect(transport);
}

main()
	.then(() => {
		console.log("MCP server started")
	})
	.catch(error => {
		console.log(error);
})