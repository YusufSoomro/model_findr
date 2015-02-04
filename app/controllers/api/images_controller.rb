class Api::ImagesController < ApplicationController
  def create
    @image = Image.new(image_params)

    if @image.save
      render json: @image
    else
      render @image.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @image = Image.find(params[:id])

    if @image
      render json: @image
    else
      render json: "Image not found", status: :unprocessable_entity
    end
  end

  private
    def image_params
      params.require(:image).permit(:user_id, :img_url, :caption)
    end
end
