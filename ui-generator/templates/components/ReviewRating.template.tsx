import React from "react";
import ReviewRating from "../../../React-UI-Collection/src/components/ui/inputs/rating/ReviewRating.tsx";

export default function ReviewRatingTemplate() {
  return <ReviewRating max={"5"} size={"md"} required={"false"} showReviewText={"false"} reviewPlaceholder={"Write your review..."} submitButtonText={"Submit Review"} labels={"[Poor"} className={""}>ReviewRating</ReviewRating>;
}
