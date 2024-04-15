export const load = async () => {
	return {
		columns: [
			{
				id: 1,
				label: '📫 Todo'
			},
			{
				id: 2,
				label: 'In Progress'
			},
			{
				id: 3,
				label: 'Awaiting Merge'
			},
			{
				id: 4,
				label: '✅Done'
			}
		],
		cards: [
			{
				column: 1,
				id: 'a',
				title: 'Wash Dishes'
			},
			{
				column: 2,
				id: 'b',
				title: 'Code DND Example'
			},
			{
				column: 3,
				id: 'b',
				title: 'Code DND Example'
			},
			{
				column: 4,
				id: 'b',
				title: 'Code DND Example'
			}
		]
	};
};
// ToDO - In Progress  - Awaiting Merge - Done
