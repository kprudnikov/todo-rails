module Api
  module V1

    class ListsController < ApplicationController

      before_action :check_access, only: [:update, :destroy]

      def index
        @lists = current_user.lists

        respond_to do |format|
          format.json {render json: @lists.to_json(include: :tasks)}
        end
      end

      def create
        @list = current_user.lists.create
        respond_to do |f|
          f.json {render json: @list, status: :ok}
        end
      end

      def destroy
        @list = List.find(params[:id])
        @list.destroy

        respond_to do |f|
          f.json { render( json: {}, status: :ok )}
        end

      end

      def update
        @list = List.find(params[:id])
        @list.update(title: params[:title])
        respond_to do |f|
          f.json {render(json: @list, status: :ok)}
        end
      end

private

  def check_access
    unless current_user.lists.exists?(params[:id])
      respond_to do |f|
        f.json {render(json: {}, status: :not_found)}
      end
      return
    end
  end

    end
  end
end
