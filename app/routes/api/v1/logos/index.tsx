import { json } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";

import type { Logos } from "~/models/image.server";
import { getLogos } from "~/models/image.server";

export async function loader({ request }: any): Promise<Response> {
  const reqUrl = new URL(request.url);
  const paramUrl = reqUrl.searchParams.get('url');

  invariant(
    typeof paramUrl === "string",
    "paramUrl must be a string"
  );

  const logos: Logos = await getLogos(new URL(paramUrl));
  
  return json(logos);
}