import { rest } from 'msw';
export const handlers = [
    rest.post('http://localhost:8080/v1/customer/add', (req, res, ctx) => {
    //add after v1

        const customerDetails =
      JSON.parse(localStorage.getItem('CustomersList')) || [];
        const newData = req.body;
        const data = [...customerDetails, newData];
        localStorage.setItem('CustomersList', JSON.stringify(data));
        const customerList = localStorage.getItem('CustomersList');
        console.log(customerList);
        return res(ctx.status(200));
    }),
    //how to use currenpage
    rest.get('http://localhost:8080/v1/invoice/list', async (req, res, ctx) => {
        const invoiceList = [
            {
                CreatedAt: '2022-07-28T00:02:54+05:30',
                CustomerName: '',
                DueDate: '1999-12-31T05:30:00+05:30',
                InvoiceId: 1,

                Notes: '',
                PaidStatus: 'Not Paid',
                ReferenceNumber: 'PiLuPfKLWK',
                Status: 'Not Sent',
                TotalAmount: 1196,
                billing_address: '',
            },
        ];
        console.log(invoiceList);
        return res(
            ctx.status(200),
            ctx.json({
                invoiceList: invoiceList,
            })
        );
    }),
];
