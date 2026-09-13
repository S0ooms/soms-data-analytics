-- Q1: Who are the top 10 customers by total amount spent?
-- Hint: JOIN, GROUP BY, SUM, ORDER BY, LIMIT
use olist;

select
	c.customer_id,
    round(sum(o2.payment_value), 2) as total_spent,
    count(distinct o1.order_id) as num_orders
from customers c
inner join orders o1
on c.customer_id = o1.customer_id
inner join order_payments o2
on o1.order_id = o2.order_id
group by c.customer_id
order by total_spent desc
limit 10;
