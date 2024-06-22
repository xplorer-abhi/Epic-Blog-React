
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active"
        },
    });
    const [selectedFile, setSelectedFile] = useState(null); 

    const navigate = useNavigate();
    //const userData = useSelector((state) => state.auth.userData);
    const userData = useSelector((state) => {
        console.log("Auth state:", state.auth);
        return state.auth.userData;
    });

    const submit = async (data) => {
        //console.log("Form Data Submitted:", data);  

        if (!userData) {
            console.error("User data is undefined. Ensure the user is authenticated.");
            return;
        }

        try {
            let dbPost;

            if (post) {
                const file = selectedFile ? await appwriteService.uploadFile(selectedFile) : null;

                if (file) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });
            } else {
                const file = selectedFile ? await appwriteService.uploadFile(selectedFile) : null;

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                }
            }

            if (dbPost) {
                console.log("Post created/updated successfully:", dbPost);  
                navigate(`/post/${dbPost.$id}`);
            }

        } catch (error) {
            console.error("Error submitting the form", error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                    onChange={handleFileChange}
                />
                {post && post.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

PostForm.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string,
        slug: PropTypes.string,
        content: PropTypes.string,
        status: PropTypes.string,
        featuredImage: PropTypes.string,
    }),
};

export default PostForm;

