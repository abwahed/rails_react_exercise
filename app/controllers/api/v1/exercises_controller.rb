class Api::V1::ExercisesController < ApplicationController
  before_action :set_exercise, only: %i[show destroy]

  def index
    exercises = Exercise.all.order(created_at: :desc)
    render json: exercises
  end

  def create
    exercise = Exercise.create!(exercise_params)
    if exercise
      render json: exercise
    else
      render json: exercise.errors
    end
  end

  def show
    render json: @exercise
  end

  def destroy
    @exercise&.destroy
    render json: { message: 'Exercise deleted!' }
  end

  private
  def exercise_params
    params.permit(:name, :image, :trainings, :instruction)
  end

  def set_exercise
    @exercise = Exercise.find(params[:id])
  end
end
