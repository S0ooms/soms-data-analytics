-- Q2: What is the monthly revenue trend across the dataset?
-- Hint: GROUP BY date, SUM
use olist;

select 
	date_format(o1.order_purchase_timestamp, '%Y' "-" '%m') as month,
    format(sum(o2.payment_value), 0) as revenue
from orders o1
inner join order_payments o2
on o1.order_id = o2.order_id
group by month
order by month;