import { Table as MantineTable } from "@mantine/core";
import type { TableProps } from "@mantine/core";
import { Scrollable } from "./Scrollable";

export const Table = (props: React.PropsWithChildren<TableProps>) => (
	<Scrollable>
		<MantineTable {...props} />
	</Scrollable>
);
export const TableHead = MantineTable.Thead;
export const TableBody = MantineTable.Tbody;
export const TableFooter = MantineTable.Tfoot;
export const TableRow = MantineTable.Tr;
export const TableCell = MantineTable.Td;
