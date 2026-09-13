-- Q4: Which product categories generate the most revenue?
-- Hint: multi-table JOIN, GROUP BY
use olist;

select
	p.product_category_name as product_category,
    sum(o.price) as revenue
from products p
inner join order_items o
on p.product_id = o.product_id
group by product_category
order by revenue desc;