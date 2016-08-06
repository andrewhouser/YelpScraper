# Yelp! Scraper [v .5]

> Scrapes through Yelp! page reviews of a specified location and returns filterable results.


This project came to be when sales at the company I work for wanted to demonstrate to our B2B customers how our SaaS affected their consumer perception. Yelp! is a great way for consumers to present feedback to a business, but there is a lot of manual work in reading through review and understand when actions, promotions, or other events may have affected those perceptions.

Yelp! lacks the ability for businesses to filter reviews by a date range, look at the aggregate of reviews by date, or even look at reviews completely without paginating.

This project enabled our sales team to look through those reviews and be able to communicate with our customers how implementing our service in their business increased their customer satisfaction.

##### Improvements

There are a number of planned improvements to this project, including:
- Export (CSV, initially)
- Additional filter options ( filter by reporter, rating, etc)
- Additional data returned from the yelpscraper service
- etc

## Build Requirements

- NodeJS

```shell
npm install
```

All required packages will be installed. To build, either select the KnockoutJS version

```js
grunt knockout
```

Or the ReactJS version

```js
grunt react
```
The KnockoutJS version is the default. The ReactJS version will be located in the ./[DIR]/react/ folder

## Run Requirements

- PHP 5.6+
