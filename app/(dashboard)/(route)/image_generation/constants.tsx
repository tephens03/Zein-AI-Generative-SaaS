import * as z from "zod";

export const formSchema = z.object({
    prompt: z.string().min(1, "Prompt is required."),
    quantity: z.string(),
    resolution: z.string()
});


export const resolutions = [{
    value: "256x256",
},
{
    value: "512x512",
},
{
    value: "1024x1024",
},
];

export const quantities = [{
    value: '1'
},
{
    value: '2'
},
{
    value: '3',
},
{
    value: '4',
},
{
    value: '5',
},
];


