module Api
  module V1

    class TasksController < ApplicationController

      before_action :check_access, only: [:update, :destroy]
      before_action :check_list_access, only: [:create, :update_all]

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
        @task.update(task_params)

        respond_to do |f|
          f.json { render( json: @task, status: :ok )}
        end
      end

      def update_all
        params[:_json].each do |t|
          @list.tasks.find(t[:task][:id]).update(task_params(t))
        end

        respond_to do |f|
          f.json {render(json: @list, status: :ok)}
        end
      end

private

      def task_params(params = params)
        params.require(:task).permit([:title, :complete, :priority])
      end

      def check_access
        unless current_user.tasks.exists?(params[:id])
          reply_not_found
          return
        end
        @task = Task.find(params[:id])
      end

      def check_list_access
        unless current_user.lists.exists?(params[:list_id])
          reply_not_found
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