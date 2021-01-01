import { FunctionComponent } from "react";

type InitialFetch<Response> = { fetchInitialData(params?: Record<string, string>): Promise<Response>; };

export type FC<Response, Props = {}> = FunctionComponent<Props> & InitialFetch<Response>;
