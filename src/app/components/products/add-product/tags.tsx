import useTagSubmit from "@/hooks/useTagSubmit";
import { useGetAllTagsQuery } from "@/redux/tag/tagApi";
import React, { useEffect, useRef } from "react";
import { TagsInput } from "react-tag-input-component";

type IPropType = {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  default_value?: string[];
};

const Tags = ({ tags, setTags, default_value }: IPropType) => {
  const { data: tagsData, isError, isLoading, refetch } = useGetAllTagsQuery();
  const { handleSubmitTag } = useTagSubmit();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (default_value && !isInitialized.current) {
      setTags(default_value);
      isInitialized.current = true;
    }
  }, [default_value, setTags]);

  const handleTagClick = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  // Validate or add new tag
  const handleAddTag = async (newTag: string) => {
    const lowerNewTag = newTag.toLowerCase();
    const existingTag = tagsData?.result?.find(
      (tag: { name: string }) => tag.name.toLowerCase() === lowerNewTag
    );

    if (existingTag && !tags.includes(existingTag.name)) {
      // Tag exists and is not already selected — add it to the input
      setTags((prevTags) => [...prevTags, existingTag.name]);
    } else if (!existingTag) {
      // Tag doesn't exist — add to DB and then add to input
      const createdTagId = await handleSubmitTag({ name: newTag });

      if (createdTagId) {
        setTags((prevTags) => [...prevTags, newTag]);
        refetch(); // Refresh the tag list after adding
      }
    }
  };

  return (
    <div className="mb-5 tp-product-tags">
      <div className="flex flex-wrap gap-2 mb-3">
        {isLoading && <p>Loading tags...</p>}
        {isError && <p>Error loading tags</p>}
        {tagsData?.result?.map((tag: { _id: string; name: string }) => (
          <button
            type="button"
            key={tag._id}
            onClick={() => handleTagClick(tag.name)}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-blue-300 border"
            disabled={tags.includes(tag.name)} // Disable if already selected
          >
            {tag.name}
          </button>
        ))}
      </div>

      <TagsInput
        value={tags}
        onChange={setTags}
        name="tags"
        placeHolder="Enter tags"
        beforeAddValidate={(tag) => {
          handleAddTag(tag); // Check and handle tag on enter
          return false; // Prevent default addition, we’ll handle it manually
        }}
      />
      <em>Press enter to add a new tag</em>
    </div>
  );
};

export default Tags;
