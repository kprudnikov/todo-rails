module Api
  module V1

    class TasksController < ApplicationController

      before_action :check_access, only: [:update, :destroy]
      before_action :check_list_access, only: [:create]

      def index
        @tasks = current_user.tasks

        respond_to do |f|
          f.json {render json: @tasks, status: :ok}
        end
      end

      def create
        @task = @list.tasks.create(title: params[:title])

        respond_to do |f|
          f.json {render( json: @task, status: :ok)}
        end
      end

      def destroy
        @task.destroy

        respond_to do |f|
          f.json { render( json: {}, status: :ok )}
        end
      end

      def update
        @task.update(title: params[:title], complete: params[:complete])

        respond_to do |f|
          f.json { render( json: @task, status: :ok )}
        end
      end

private

      def check_access
        unless current_user.tasks.exists?(params[:id])
          return_not_found
          return
        end
        @task = Task.find(params[:id])

      end

      def check_list_access
        unless current_user.lists.exists?(params[:list_id])
          return_not_found
          return
        end
        @list = List.find(params[:list_id])
      end

      def reply_not_found
        respond_to do |f|
          f.json {render(json: {}, status: :not_found)}
        end
      end

    end

  end
end