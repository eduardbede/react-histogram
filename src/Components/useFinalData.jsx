import useGetApiData from "./useGetApiData";

export default function useFinalData(){
const {dataFetch, loading} = useGetApiData();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dataObject = [
    {
        "month": "January",
        "posts": 0
    },
    {
        "month": "February",
        "posts": 0
    },
    {
        "month": "March",
        "posts": 0
    },
    {
        "month": "April",
        "posts": 0
    },
    {
        "month": "May",
        "posts": 0
    },
    {
        "month": "June",
        "posts": 0
    },
    {
        "month": "July",
        "posts": 0
    },
    {
        "month": "August",
        "posts": 0
    },
    {
        "month": "September",
        "posts": 0
    },
    {
        "month": "October",
        "posts": 0
    },
    {
        "month": "November",
        "posts": 0
    },
    {
        "month": "December",
        "posts": 0
    }
]

//transform data from millisecond to months
const processedData = dataFetch.data?.allPosts.map(el=>{
    return new Date(Number(el.createdAt)).getMonth();
   });

//make 'processedData' array with unique elements
const uniqueElements = [...new Set(processedData)];

//create data with months names and post per months
const countOfPosts = uniqueElements?.map(element => {
    return {
    month:monthNames[element],
    posts:processedData.filter(el => el === element).length
}});

//function that concat months object with new created object 'countOfPosts' and replace objects with new data
const data = Object.values(dataObject.concat(countOfPosts).reduce((a, {month, posts}) => {
     (a[month] || (a[month] = {month, posts: 0})).posts = posts;
     return a;
   }, Object.create(null)));
  return {data, loading}
}
